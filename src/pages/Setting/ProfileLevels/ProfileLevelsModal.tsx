import { FormEvent, useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { ProfileLevelsModalProps } from "../../../utils/types/levelType";
import { useLanguage } from "../../../api/locales/LanguageContext";

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
  const [levelNameAr, setLevelNameAr] = useState("");
  const [levelNameEn, setLevelNameEn] = useState("");

  useEffect(() => {
    if (initialData) {
      setMaxPoints(initialData.MaxPoints.toString());
      setMinPoints(initialData.MinPoints.toString());
      setLevelNameAr(initialData.levelNameAr);
      setLevelNameEn(initialData.levelNameEn);
    } else {
      setMaxPoints("");
      setMinPoints("");
      setLevelNameAr("");
      setLevelNameEn("");
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ MinPoints, MaxPoints, levelNameEn, levelNameAr });
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? t("modalTitleEditLevel") : t("modalTitleAddLevel")}
    >
      <Form onSubmit={onSubmit} className="flex flex-col gap-3 p-5 mt-4 ">
        <div className="border-b pb-4">
          <Input
            id="levelNameAr"
            label={t("levelNameAr")}
            placeholder={t("levelNameAr")}
            value={levelNameAr}
            required
            onChange={(e) => setLevelNameAr(e.target.value)}
          />
        </div>

        <div className="border-b pb-4">
          <Input
            id="levelNameEn"
            label={t("levelNameEn")}
            placeholder={t("levelNameEn")}
            value={levelNameEn}
            required
            onChange={(e) => setLevelNameEn(e.target.value)}
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

        <div className="border-b pb-4">
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
