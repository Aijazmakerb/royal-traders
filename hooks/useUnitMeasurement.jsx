export default function convertToYards(input) {
    const units = {
        yd: 1,
        in: 1 / 36,
        cm: 1 / 91.44,
        m: 1.09361,
    };

    const parts = input.toLowerCase().match(/(\d*\.?\d+)\s*(yd|in|cm|m)/g) || [];
    return parts.reduce((total, part) => {
        const [, value, unit] = part.match(/(\d*\.?\d+)\s*(yd|in|cm|m)/);
        return total + parseFloat(value) * units[unit];
    }, 0);
}