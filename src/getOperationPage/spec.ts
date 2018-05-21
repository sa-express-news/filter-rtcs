import * as test from 'tape';

import { getPage } from './index';

test('getPage grabs page associated with given operation ID', async t => {
	let $ = await getPage(111812);
	let td = $('font:contains("256183")', 'td');
	let result = td.text().trim();
	let expectation = '256183';
	t.equal(result, expectation);
	t.end();
});
