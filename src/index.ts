#! /usr/bin/env node

import getData 					from './getData';
import getOperationPage 		from './getOperationPage';
import scrapeProgramProvided 	from './scrapeProgramProvided';
import addProgramsToIncident	from './addProgramsToIncident';
import writeToCSVAndPush		from './writeToCSVAndPush';

// interfaces
import { Incident, IncidentWithPrograms } from './interfaces';

export const sheet 		= 'cpa_gro';
export const dataset 	= 'dfps-cpainvestigations-data';
export const filename	= 'Non-Compliance-Merge-With-Programs';

const isGRO = (incident: Incident) => incident.operation_type === 'General Residential Operation';

const getProgramProvided = async (incident: Incident) => {
	if (isGRO(incident)) {
		const $ = await getOperationPage(incident.operation_id);
		return scrapeProgramProvided($);
	} else {
		return 'Child Placing Agency';
	}
};

const run = async () => {
	const result: Array<IncidentWithPrograms> 	= [];
	let programProvided: string 				= '';
	const data: any 							= await getData(dataset, sheet);

	for (let i: number = 0; i < data.length; i++) {
		programProvided = await getProgramProvided(data[i]);
		result.push(addProgramsToIncident(data[i], programProvided));
		console.log(`${i + 1} of ${data.length} complete`);
	}
	await writeToCSVAndPush(result, filename, dataset);
	console.log('Success!')
};
run();
