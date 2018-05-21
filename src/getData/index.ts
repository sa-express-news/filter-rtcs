require('dotenv').config();

import * as rp from 'request-promise';

// interfaces
import { Incident } from '../interfaces';

const apiKey = process.env.DW_API_KEY;

const getSQLQuery = (sheet: string) => encodeURIComponent(`SELECT * FROM ${sheet}`);

const setConfigObj = (dataset: string, sheet: string) => ({
	uri: `https://api.data.world/v0/sql/expressnews/${dataset}?query=${getSQLQuery(sheet)}`,
	headers: {
		'Authorization': `Bearer ${apiKey}`,
		'Accept': 'application/json',
	},
	json: true,
});

export const getSheet = (dataset: string, sheet: string) => rp(setConfigObj(dataset, sheet))
				.then((res: Array<Incident>) => res)
				.catch((err: any) => console.error(err));

export default async (dataset: string, sheet: string) => await getSheet(dataset, sheet);
