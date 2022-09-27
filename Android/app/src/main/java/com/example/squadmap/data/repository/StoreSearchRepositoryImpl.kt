package com.example.squadmap.data.repository

import com.example.squadmap.data.datasource.StoreSearchDataSource
import com.example.squadmap.data.dto.toStoreSearchData
import com.example.squadmap.data.model.StoreSearchData
import javax.inject.Inject

class StoreSearchRepositoryImpl @Inject constructor(
    private val dataSource: StoreSearchDataSource
) : StoreSearchRepository {

    override suspend fun getSearchResult(query: String, display: Int, start: Int): StoreSearchData {
        return dataSource.getSearchResult(query, display, start).toStoreSearchData()
    }

}