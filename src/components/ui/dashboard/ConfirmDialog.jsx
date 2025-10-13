import Button from "../../ui/primitives/Button";
import Modal from "../../ui/primitives/Modal";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-md overflow-hidden p-0"
    >
      {/* Header */}
      <div className="border-b border-border/70 p-5">
        <h2 className="font-headline text-xl font-semibold text-foreground">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-muted-foreground">{message}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 border-t border-border/70 p-5">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          type="button"
          variant="primary"
          className="flex-1"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {isLoading ? "Deleting..." : confirmText}
        </Button>
      </div>
    </Modal>
  );
}
