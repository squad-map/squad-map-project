package com.example.squadmap.ui.addstore

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.squadmap.common.logger
import com.example.squadmap.data.model.ResultStore
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

    private val _isEnd = mutableStateOf(false)
    val isEnd: State<Boolean> = _isEnd

    private val _searchResult = MutableStateFlow<UiState<List<ResultStore>>>((UiState.Loading))
    val searchResult = _searchResult.asStateFlow()

    private val _addStore = MutableStateFlow<UiState<ResultStore>>(UiState.Loading)
    val addStore = _addStore.asStateFlow()

    fun updateQuery(newValue: String) {
        _query.value = newValue
        currentPage = 1
        _searchResult.value = UiState.Loading
        logger(newValue)
    }

    fun search() {
        viewModelScope.launch {
            kotlin.runCatching {
                storeSearchRepository.getSearchResult(query = query.value, page = currentPage)
            }.onFailure { e ->
                _searchResult.value = UiState.Error("${e.message} 에러")
                logger("${e.message}")
            }.onSuccess { data ->
                _isEnd.value = data.isEnd
                val list = mutableListOf<ResultStore>()
                _searchResult.value._data?.let {
                    list.addAll(it)
                }
                list.addAll(data.items)
                logger("${list.size}")
                _searchResult.value = UiState.Success(list)
                currentPage++
            }
        }
    }

    fun setAddStoreInfo(store: ResultStore) {
        _addStore.value = UiState.Success(store)
    }

}
