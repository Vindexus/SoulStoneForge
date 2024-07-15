export default function formatDate (date: Date) {
	return new Date(date).toLocaleTimeString('en-CA', {
		timeZone: 'America/Vancouver',
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}
