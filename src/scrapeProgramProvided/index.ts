const failure: string = 'Couldn\'t find programs';

const getPrograms = ($: any) => {
	const $key = $('font:contains("Program Provided:")', 'td');
	if ($key.length !== 1) return failure;

	const $programs = $key.parent().next().children('font');
	if ($programs.length !== 1) return failure;

	return $programs.text().trim();
}

export default ($: any) => getPrograms($);