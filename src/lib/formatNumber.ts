const formatNumber = (number: number): string => {
	const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

	return numberFormatter.format(number);
};

export default formatNumber;
