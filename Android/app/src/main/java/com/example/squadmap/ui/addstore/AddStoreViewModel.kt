package com.example.squadmap.ui.addstore

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.squadmap.common.logger
import com.example.squadmap.data.model.ResultStore
import com.example.squadmap.data.model.StoreSearchData
import com.example.squadmap.data.repository.StoreSearchRepository
import com.example.squadmap.ui.common.UiState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AddStoreViewModel @Inject constructor(
    private val storeSearchRepository: StoreSearchRepository
): ViewModel() {

    private var currentPage = 1

    private val _query = mutableStateOf("")
    val query: State<String> = _query

    private val _searchResult = MutableStateFlow<UiState<List<ResultStore>>>((UiState.Loading))
    val searchResult = _searchResult.asStateFlow()

    fun updateQuery(newValue: String) {
        _query.value = newValue
        currentPage = 1
        _searchResult.value = UiState.Loading
        logger(newValue)
    }

    fun search() {
        viewModelScope.launch {
            kotlin.runCatching {
                storeSearchRepository.getSearchResult(query = query.value, start = currentPage)
            }.onFailure { e ->
                _searchResult.value = UiState.Error("${e.message} 에러")
            }.onSuccess { data ->
//                if(currentPage >= data.total) return@launch
                val list = mutableListOf<ResultStore>()
                _searchResult.value._data?.let {
                    list.addAll(it)
                }
                list.addAll(data.items)
                logger("$list")
                _searchResult.value = UiState.Success(list)
                currentPage += data.items.size
            }
        }
    }
}
