import { TransportType } from '../components/types/Route';

/**
 * Checks if the given transport type has distance.
 * @param {TransportType} transport - The transport type to check.
 * @return {boolean} - Whether the transport has distance.
 */
export const hasTransportDistance = (transport: TransportType): boolean => {
  return (
    transport === TransportType.bike ||
    transport === TransportType.walk ||
    transport === TransportType.bus
  );
};
