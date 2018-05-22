import * as test from 'tape';

import { getKey, getPrograms } from './index';
import getOperationPage from '../getOperationPage';

test('getKey and getPrograms identify the program string and return it clean', async t => {
	const $ = await getOperationPage(111812);
	const $key = getKey($);
	const $programs = getPrograms($key);

	let boolResult = $key.length === 1;
	let boolExpectation = true;
	t.equal(boolResult, boolExpectation);

	boolResult = $programs.length === 1;
	t.equal(boolResult, boolExpectation);

	let strResult = $programs.text().trim();
	let strExpectation = 'Residential Treatment Center';
	t.equal(strResult, strExpectation);

	t.end();
});