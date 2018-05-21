import * as test 	from 'tape';
import * as _		from 'lodash';

import { getSheet } 		from './index';

export const sheet 		= 'cpa_gro';
export const dataset 	= 'dfps-cpainvestigations-data';

// interfaces
import { Incident } from '../interfaces';

test('getSheet returns an array of objects with a numerical \'operation_id\' property', async t => {
	const response = await getSheet(dataset, sheet);
	let result = _.isArray(response);
	let expected = true;
	t.equal(result, expected);
	result = !!response[0].operation_id;
	t.equal(result, expected);
	result = typeof response[0].operation_id === 'number';
	t.equal(result, expected);
	t.end();
});

// does a specific incident fit the expected structure
test('getSheet returns an array of objects that meet the Incident interface structure', async t => {
	const response: any = await getSheet(dataset, sheet);
	let result = _.find(response, (hash: Incident) => hash.operation_id === 94259)
	let expected = {
		operation_id: 94259,
		operation_type: "General Residential Operation",
		operation_name: "Childrens Shelter",
		county: "BEXAR",
		activity_id: 433541344,
		section_id: 1905757345,
		non_compliance_id: 1284866359,
		standard_number_description: "748.2307(9) - Other Prohibited Punishments-subjecting a child to abusive or profane language",
		standard_risk_level: "Medium High",
		corrected_at_inspection: false,
		corrected_date: "2017-07-05T00:00:00",
		date_correction_verified: "2017-07-07T00:00:00",
		narrative: "During the investigation it was found that staff was yelling and using at the children in care on more than one occasion.",
		technical_assistance_given: true
	}
	t.deepEqual(result, expected);
	t.end();
});
