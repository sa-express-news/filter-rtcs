#! /usr/bin/env node

import getData 					from './getData';
import getOperationPage 		from './getOperationPage';
import scrapeProgramProvided 	from './scrapeProgramProvided';

// interfaces
import { Incident } from './interfaces';

export const sheet 		= 'cpa_gro';
export const dataset 	= 'dfps-cpainvestigations-data';

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
	const data: any = await getData(dataset, sheet);
	for (let i: number = 0; i < 1; i++) {
		const programProvided = await getProgramProvided(data[i]);
	}
};
run();
