// interfaces
import { Incident } from '../interfaces';

export default (incident: Incident, programs: string) => Object.assign({}, incident, { programs_provided: programs });