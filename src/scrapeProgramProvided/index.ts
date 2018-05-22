const failure: string = 'Couldn\'t find programs';

export const getKey = ($: any) => $('font:contains("Program Provided:")', 'td');

export const getPrograms = ($key: any) => $key.parent().next().children('font');

export default ($: any) => {
	const $key = getKey($);
	if ($key.length !== 1) return failure;

	const $programs = getPrograms($key);
	if ($programs.length !== 1) return failure;

	return $programs.text().trim();
}
