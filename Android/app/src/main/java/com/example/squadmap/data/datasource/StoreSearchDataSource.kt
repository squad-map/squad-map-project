package com.example.squadmap.data.datasource

import com.example.squadmap.data.dto.StoreSearchResultDTO
import retrofit2.http.Query

interface StoreSearchDataSource {

    suspend fun getSearchResult(query: String, page: Int): StoreSearchResultDTO

}