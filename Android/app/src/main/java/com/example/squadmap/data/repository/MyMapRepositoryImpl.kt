package com.example.squadmap.data.repository

import com.example.squadmap.data.datasource.MyMapDataSource
import javax.inject.Inject

class MyMapRepositoryImpl @Inject constructor(
    private val myMapDataSource: MyMapDataSource
) : MyMapRepository {

}