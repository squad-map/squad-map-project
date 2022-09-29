package com.example.squadmap.data.repository

import com.example.squadmap.data.datasource.StoreSearchDataSource
import com.example.squadmap.data.dto.toStoreSearch
import com.example.squadmap.data.model.ResultStore
import com.example.squadmap.data.model.StoreSearchData
import javax.inject.Inject

class StoreSearchRepositoryImpl @Inject constructor(
    private val dataSource: StoreSearchDataSource
) : StoreSearchRepository {

    override suspend fun getSearchResult(query: String, page: Int): StoreSearchData {
        return dataSource.getSearchResult("서울 $query", page).toStoreSearch()
    }

}