package com.example.squadmap.data.datasource

import com.example.squadmap.network.StoreSearchApi
import javax.inject.Inject

class StoreSearchDataSourceImpl @Inject constructor(
    private val api: StoreSearchApi
) : StoreSearchDataSource {

    override suspend fun getSearchResult(query: String, display: Int, start: Int) =
        api.getSearchResult(query = query, display = display, start = start)

}