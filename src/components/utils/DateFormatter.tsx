import { parseISO, format } from 'date-fns';
import { es, enGB } from 'date-fns/locale';
import { memo } from 'react';
import { Language } from 'src/utils/interfaces/languages';

type Props = {
  dateString: string;
  locale: Language;
};

const DateFormatter = ({ dateString, locale }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {locale === 'en'
        ? format(date, 'd LLLL yyyy', { locale: enGB })
        : format(date, "d 'de' LLLL 'de' yyyy", { locale: es })}
    </time>
  );
};

export default memo(DateFormatter);
