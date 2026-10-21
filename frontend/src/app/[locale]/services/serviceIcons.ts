import { MapPin, Globe, Truck, Timer, Warehouse, RefreshCw, type LucideIcon } from 'lucide-react';

export const serviceIcons: Record<string, LucideIcon> = {
  'full-truckload-ftl': Truck,
  'cross-border-freight': Globe,
  'door-to-door-freight': MapPin,
  'expedited-freight': Timer,
  warehousing: Warehouse,
  transloading: RefreshCw
};
