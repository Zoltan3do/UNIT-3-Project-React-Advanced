export function convertTimestampToFormattedDate(dt) {
    const date = new Date(dt * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getDayInItalian(dateString) {
    const giorniSettimana = [
        'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
    ];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return giorniSettimana[dayOfWeek];
}
