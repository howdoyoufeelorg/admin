export const languageOptions = [
    {id: 'en', name: 'US English'},
    {id: 'es', name: 'Espanol'},
];

export const getUnusedLanguage = (usedLanguages) => {
    usedLanguages = usedLanguages.filter(item => !!item); // Removes null values
    const remainingLanguages = languageOptions.filter(item => !usedLanguages.find(element => element === item.id));
    const firstRemainingLanguage = remainingLanguages[0];
    return firstRemainingLanguage ? firstRemainingLanguage.id : '';
}