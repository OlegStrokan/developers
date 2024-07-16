import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {GET_EXCHANGE_RATES} from "../graqhql/exchange-rate.query";


export const CurrencyExchangeTable = () => {
    const { loading, error, data } = useQuery(GET_EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-8">Currency Exchange Rates</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Currency
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Buying Rate
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Selling Rate
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Currency Unit
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.exchangeRates.map((rate: any) => (
                    <tr key={rate.currency}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {rate.currency}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {rate.buyingRate}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {rate.sellingRate}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {rate.name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {rate.currencyUnit}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
