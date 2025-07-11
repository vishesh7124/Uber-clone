interface Suggestion {
    place_id: string;
    description: string;
    structured_formatting?: {
        main_text: string;
        secondary_text: string;
    };
    types?: string[];
}

interface LocationSearchPanelProps {
    setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>;
    suggestions: Suggestion[];
    loading: boolean;
    onSuggestionSelect: (suggestion: Suggestion) => void;
}

const LocationSearchPanel = ({
    setVehiclePanel,
    suggestions,
    loading,
    onSuggestionSelect
}: LocationSearchPanelProps) => {

    const handleSuggestionClick = (suggestion: Suggestion) => {
        onSuggestionSelect(suggestion);
        // setVehiclePanel(true);
    };

    // Show loading state
    if (loading) {
        return (
            <div className="p-5 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                    <span className="text-gray-600">Searching locations...</span>
                </div>
            </div>
        );
    }

    // Show message when no suggestions
    if (suggestions.length === 0) {
        return (
            <div className="p-5 text-center text-gray-500">
                <i className="ri-search-line text-2xl mb-2"></i>
                <p>Start typing to search for locations</p>
            </div>
        );
    }

    return (
        <>
            {suggestions.map((suggestion: Suggestion, index: number) => (
                <div
                    onClick={() => handleSuggestionClick(suggestion)}
                    key={suggestion.place_id || index}
                    className="p-5 pt-2 flex items-center gap-2 justify-start border-2 border-gray-100 active:border-black hover:bg-gray-50 cursor-pointer transition-all duration-200"
                >
                    <h2 className="bg-[#eee] h-8 w-9 flex items-center justify-center rounded-full flex-shrink-0">
                        <i className="text-xl ri-map-pin-fill"></i>
                    </h2>
                    <div className="flex-1 min-w-0">
                        {suggestion.structured_formatting ? (
                            <div>
                                <h4 className="text-base font-medium text-gray-900 truncate">
                                    {suggestion.structured_formatting.main_text}
                                </h4>
                                <p className="text-sm text-gray-500 truncate">
                                    {suggestion.structured_formatting.secondary_text}
                                </p>
                            </div>
                        ) : (
                            <h4 className="text-base font-medium text-gray-900 truncate">
                                {suggestion.description}
                            </h4>
                        )}
                    </div>
                    <div className="flex-shrink-0">
                        <i className="ri-arrow-right-s-line text-gray-400"></i>
                    </div>
                </div>
            ))}
        </>
    );
};

export default LocationSearchPanel;