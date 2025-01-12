export const StringUtils = {
    capitalizeFirstLetter: (input: string): string => {
        if (!input) {
            return '';
        }

        return input.charAt(0).toUpperCase() + input.slice(1);
    },
    getImageUrls: (input: any, initialList: string[] = []): string[] => {
        if (input === undefined || input === null) {
            return initialList;
        }

        if (typeof input === 'string') {
            initialList.push(input);
            return initialList;
        }

        for(let key of Object.keys(input)) {
            initialList.push(...StringUtils.getImageUrls(input[key]));
        }

        return initialList;
    }
};