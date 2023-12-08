export interface DrugDetails {
    code: string;
    range_start: string;
    range_end: string;
    product_name: string;
    generic_name: string;
    dosage_strength: string;
    dosage_form: string;
    indication: string;
    price_index: [
        {
            lowest_price: number;
        },
        {
            median_price: number;
        },
        {
            highest_price: number;
        }
    ];
}

export interface ProviderDetail {
    code: string;
    product_name: string;
    prescription_drug: boolean;
    indication: string;
    provider: string;
    provider_code: number;
    min_range: string;
    max_range: string;
}
