import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthData } from "../../../contexts/AuthContext";
import { useWisdomLogs } from "../../../contexts/WisdomLogsContext";
import { useWisdomsData } from "../../../contexts/WisdomsContext";
import { saveDailyWisdom } from "../../../utils/fireStoreDB";
import AddWisdomModal from "./AddWisdomModal";

export default function WisdomLogger() {
  const [openModal, setOpenModal] = useState(false);
  const [applied, setApplied] = useState(false);
  const { wisdomsData } = useWisdomsData();
  const { wisdomLogs, setWisdomLogs } = useWisdomLogs();
  const { authData } = useAuthData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleWisdomLog(data) {
    const today = new Date().toISOString().split("T")[0];
    const randomId = crypto.randomUUID();
    const uid = authData?.user?.uid;

    const userSelectWisdom = wisdomsData?.wisdoms?.find(
      (wisdom) => wisdom?.id === data.wisdomId
    );

    if (!userSelectWisdom) return;

    const wisdomLog = {
      id: userSelectWisdom?.id,
      wisdomName: userSelectWisdom?.wisdomName,
      category: userSelectWisdom?.category,
      applied,
    };

    // 🔹 save to Firestore & update local state
    const status = await saveDailyWisdom(today, randomId, uid, wisdomLog);

    setWisdomLogs((prev) => {
      switch (status) {
        case "firstLog":
          return {
            uid,
            dailyBasisWisdomLogs: {
              [today]: { id: randomId, wisdoms: [wisdomLog] },
            },
          };

        case "newDayLog":
          return {
            ...prev,
            dailyBasisWisdomLogs: {
              ...prev.dailyBasisWisdomLogs,
              [today]: { id: randomId, wisdoms: [wisdomLog] },
            },
          };

        case "todayDayExist":
          return {
            ...prev,
            dailyBasisWisdomLogs: {
              ...prev.dailyBasisWisdomLogs,
              [today]: {
                ...prev.dailyBasisWisdomLogs[today],
                wisdoms: [
                  ...prev.dailyBasisWisdomLogs[today].wisdoms,
                  wisdomLog,
                ],
              },
            },
          };

        default:
          return prev; // 🛡️ fallback
      }
    });
  }

  return (
    <div className="bg-[#F9F9EB] rounded-lg border shadow-sm">
      {openModal && <AddWisdomModal onClose={() => setOpenModal(false)} />}
      <div className="p-6">
        <h3 className="font-headline text-lg font-semibold mb-2">
          Daily Wisdom Log
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          What wisdom did you practice today?{" "}
          {wisdomsData?.wisdoms?.length > 0 ? (
            <span className="block text-green-500 mt-2">
              Choose the wisdom name below...
            </span>
          ) : (
            <span className="block text-red-400 mt-2">
              You have no Wisdom. Please Add Wisdom by clicking the + icon.
            </span>
          )}
        </p>

        <form onSubmit={handleSubmit(handleWisdomLog)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#240F0F] mb-2">
              Select Wisdom
            </label>

            <div className="flex flex-col sm:flex-row gap-2">
              <select
                className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#388E3C]"
                {...register("wisdomId", {
                  required: "Must Select a Wisdom Name",
                })}
              >
                {wisdomsData?.wisdoms?.map(({ id, wisdomName }) => (
                  <option key={id} value={id}>
                    {wisdomName}
                  </option>
                ))}
              </select>
              {errors?.wisdomId && (
                <p className="text-red-400">{errors?.wisdomId.message}</p>
              )}

              <button
                type="button"
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                onClick={() => setOpenModal(true)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#388E3C] text-white py-2 px-4 rounded-md hover:bg-[#388E3C]/90 transition-colors flex items-center justify-center"
              onClick={() => setApplied(true)}
              disabled={!wisdomsData?.wisdoms?.length}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Applied
            </button>

            <button
              type="submit"
              className="flex-1 bg-[#D32F2F] text-white py-2 px-4 rounded-md hover:bg-[#D32F2F]/90 transition-colors flex items-center justify-center"
              onClick={() => setApplied(false)}
              disabled={!wisdomsData?.wisdoms?.length}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Missed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
