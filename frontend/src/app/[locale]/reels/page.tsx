import { getLocale } from 'next-intl/server';
import { getReels } from '../../../data/api';
import ReelsView from './ReelsView';

export default async function ReelsPage() {
  const locale = await getLocale() as 'en' | 'es';
  const data = await getReels(locale);
  
  return <ReelsView reels={data.docs} locale={locale} />;
}
