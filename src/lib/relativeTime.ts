const unitsInSeconds = {
	year: 365 * 24 * 60 * 60 * 1,
	month: (365 / 12) * 24 * 60 * 60 * 1,
	day: 24 * 60 * 60 * 1,
	hour: 60 * 60 * 1,
	minute: 60 * 1,
	second: 1
};

const pluralize = (word: string, amount: number) => {
	return amount > 1 ? `${word}s` : word;
};

const formatRelativeTimeOutput = (difference: number, unit: string) => {
	return `${difference} ${pluralize(unit, difference)} ago`;
};

const relativeTime = (unixTimestampSeconds: number): string => {
	const unixTimeNowSeconds = Math.floor(Date.now() / 1000);
	const differenceInSeconds = unixTimeNowSeconds - unixTimestampSeconds;

	for (const key in unitsInSeconds) {
		const unitValue = unitsInSeconds[key as keyof typeof unitsInSeconds];
		if (differenceInSeconds > unitValue) {
			return formatRelativeTimeOutput(Math.round(differenceInSeconds / unitValue), key);
		}
	}

	return 'unknown time ago';
};

export default relativeTime;
