import Select from '@/components/common/ui/Select/Select';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;

    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const languageList = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'বাংলা',
      value: 'bn',
    },
  ]
  return (
    <Select variant="compact" value={i18n.language} onChange={handleChange} options={languageList} />
  );
};

export default LanguageDropdown;