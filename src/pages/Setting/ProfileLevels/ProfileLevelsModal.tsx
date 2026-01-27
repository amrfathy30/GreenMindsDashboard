import { FormEvent, useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { ProfileLevelsModalProps } from "../../../utils/types/levelType";
import { useLanguage } from "../../../locales/LanguageContext";

export default function ProfileLevelsModal({
  open,
  onClose,
  onSave,
  loading,
  initialData,
}: ProfileLevelsModalProps) {
  const { t } = useLanguage();

  const [MaxPoints, setMaxPoints] = useState<string>("");
  const [MinPoints, setMinPoints] = useState<string>("");
  const [NameEn, setNameAr] = useState("");
  const [NameAr, setNameEn] = useState("");

  useEffect(() => {
    if (initialData) {
      setMaxPoints(initialData.MaxPoints.toString());
      setMinPoints(initialData.MinPoints.toString());
      setNameAr(initialData.NameAr);
      setNameEn(initialData.NameEn);
    } else {
      setMaxPoints("");
      setMinPoints("");
      setNameAr("");
      setNameEn("");
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ MinPoints, MaxPoints, NameEn, NameAr });
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? t("modalTitleEditLevel") : t("modalTitleAddLevel")}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-5 my-6 border rounded-2xl"
      >
        <div>
          <Input
            id="NameAr"
            label={t("levelNameAr")}
            placeholder={t("levelNameAr")}
            value={NameAr}
            required
            onChange={(e) => setNameAr(e.target.value)}
          />
        </div>

        <div>
          <Input
            id="NameEn"
            label={t("levelNameEn")}
            placeholder={t("levelNameEn")}
            value={NameEn}
            required
            onChange={(e) => setNameEn(e.target.value)}
          />
        </div>

        <div>
          <Input
            id="MinPoints"
            label={t("minPoints")}
            placeholder={t("minPoints")}
            type="number"
            required
            value={MinPoints}
            onChange={(e) => setMinPoints(e.target.value)}
          />
        </div>

        <div>
          <Input
            id="MaxPoints"
            required
            label={t("maxPoints")}
            placeholder={t("maxPoints")}
            type="number"
            value={MaxPoints}
            onChange={(e) => setMaxPoints(e.target.value)}
          />
        </div>

        <Button type="submit" className="mt-2" disabled={loading}>
          {loading
            ? initialData
              ? t("updating")
              : t("saving")
            : initialData
              ? t("updateButton")
              : t("saveButton")}
        </Button>
      </Form>
    </Modal>
  );
}
