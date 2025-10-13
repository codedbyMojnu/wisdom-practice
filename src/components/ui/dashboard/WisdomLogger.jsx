import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useWisdomLogs } from "../../../hooks/useWisdomLogs";
import { useWisdoms } from "../../../hooks/useWisdoms";
import { saveDailyWisdom } from "../../../services/fireStoreDB";
import AddWisdomModal from "./AddWisdomModal";

export default function WisdomLogger() {
  const [openModal, setOpenModal] = useState(false);
  const [applied, setApplied] = useState(true);
  const { authData } = useAuth();
  const { wisdomsData } = useWisdoms();
  const { setWisdomLogs } = useWisdomLogs();

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

    const status = await saveDailyWisdom(today, randomId, uid, wisdomLog);

    setWisdomLogs((prev) => {
      const newLogs = { ...prev };
      if (!newLogs.dailyBasisWisdomLogs) {
        newLogs.dailyBasisWisdomLogs = {};
      }

      if (status === "firstLog") {
        newLogs.uid = uid;
        newLogs.dailyBasisWisdomLogs[today] = {
          id: randomId,
          wisdoms: [wisdomLog],
        };
      } else if (status === "newDayLog") {
        newLogs.dailyBasisWisdomLogs[today] = {
          id: randomId,
          wisdoms: [wisdomLog],
        };
      } else if (status === "todayDayExist") {
        const todayLogs = newLogs.dailyBasisWisdomLogs[today]?.wisdoms || [];
        newLogs.dailyBasisWisdomLogs[today].wisdoms = [...todayLogs, wisdomLog];
      }

      return newLogs;
    });
  }

  const wisdomList = wisdomsData?.wisdoms || [];
  const hasWisdom = wisdomList.length > 0;

  return (
    <section className="glass-card p-6">
      {openModal && <AddWisdomModal onClose={() => setOpenModal(false)} />}

      <header className="mb-5 flex flex-col gap-2">
        <h3 className="font-headline text-xl font-semibold text-foreground">
          Daily Wisdom Log
        </h3>
        <p className="text-sm text-muted-foreground">
          Track which wisdoms you applied or missed today.
        </p>
      </header>

      {!hasWisdom && (
        <div className="mb-5 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          You have no wisdom entries yet. Add one to start logging your day.
        </div>
      )}

      <form onSubmit={handleSubmit(handleWisdomLog)} className="space-y-5">
        <div>
          <label className="input-label" htmlFor="wisdomId">
            Select Wisdom
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <select
              id="wisdomId"
              className="input-field"
              {...register("wisdomId", {
                required: "Select a wisdom before logging",
              })}
            >
              <option value="" disabled>
                Choose a wisdom
              </option>
              {wisdomList.map(({ id, wisdomName }) => (
                <option key={id} value={id}>
                  {wisdomName}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn btn-secondary shrink-0"
              onClick={() => setOpenModal(true)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="hidden sm:inline">Add New</span>
            </button>
          </div>
          {errors?.wisdomId && (
            <p className="mt-2 text-sm text-destructive">
              {errors.wisdomId.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="btn btn-primary flex-1"
            onClick={() => setApplied(true)}
            disabled={!hasWisdom}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Applied
          </button>

          <button
            type="submit"
            className="btn flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => setApplied(false)}
            disabled={!hasWisdom}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Missed
          </button>
        </div>
      </form>
    </section>
  );
}
