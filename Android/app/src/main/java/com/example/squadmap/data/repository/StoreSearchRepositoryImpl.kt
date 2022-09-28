package com.example.squadmap.data.repository

import com.example.squadmap.data.datasource.StoreSearchDataSource
import com.example.squadmap.data.dto.toStoreSearch
import com.example.squadmap.data.dto.toStoreSearchData
import com.example.squadmap.data.model.StoreSearchData
import javax.inject.Inject

class StoreSearchRepositoryImpl @Inject constructor(
    private val dataSource: StoreSearchDataSource
) : StoreSearchRepository {

    override suspend fun getSearchResult(query: String): List<StoreSearchData> {
        return dataSource.getSearchResult(query).toStoreSearch()
    }

}