package com.squadmap.common;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.map.ui.dto.MapCondition;
import org.springframework.core.convert.converter.Converter;

public class MapConditionConverter implements Converter<String, MapCondition> {

    @Override
    public MapCondition convert(String source) {
        try {
            return MapCondition.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP_CONDITION);
        }
    }
}
