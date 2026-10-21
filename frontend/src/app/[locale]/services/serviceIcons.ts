import { MapPin, Globe, Truck, Timer, Warehouse, RefreshCw, type LucideIcon } from 'lucide-react';
import type { ServiceId } from '../../../data/serviceSlugs';

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  ftl: Truck,
  crossBorder: Globe,
  doorToDoor: MapPin,
  expedited: Timer,
  warehousing: Warehouse,
  transloading: RefreshCw
};
