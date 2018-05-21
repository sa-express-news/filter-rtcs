import * as rp 		from 'request-promise';
import * as cheerio from 'cheerio';

const setConfigObj = (id: number) => ({
	uri: `http://www.dfps.state.tx.us/child_care/search_texas_child_care/ppFacilityDetails.asp?ptype=RC&fid=${id}`,
	transform: function (body: any) {
		return cheerio.load(body);
	}
});

export const getPage = (id: number) => rp(setConfigObj(id))
				.then(($: any) => $)
				.catch((err: any) => console.error(err));

export default async (id: number) => await getPage(id);
