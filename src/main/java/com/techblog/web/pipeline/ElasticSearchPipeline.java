package com.techblog.web.pipeline;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Maps;
import com.techblog.common.constant.Constants;
import com.techblog.common.utils.MD5Util;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import us.codecraft.webmagic.ResultItems;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.pipeline.Pipeline;

import java.util.List;
import java.util.Map;

@Service("elasticSearchPipeline")
public class ElasticSearchPipeline implements Pipeline {

    public static Logger logger = LoggerFactory.getLogger(ElasticSearchPipeline.class);


    @Override
    public void process(ResultItems resultItems, Task task) {
        Map map = resultItems.getAll();
        Object object = map.get(Constants.RESULT_LIST_MAP);
        if (object == null) {
            return;
        }
        List<Map<String, String>> listMap = (List) object;
        if (CollectionUtils.isEmpty(listMap)) {
            return;
        }

        for (Map mapResult : listMap) {
            String id = ganerateId(mapResult);
            //elasticSearchService.insertRecord(id, mapResult);
            logger.info(JSON.toJSONString(mapResult));
        }
    }

    private String ganerateId(Map map) {
        Map idMap = Maps.newHashMap();
        idMap.putAll(map);
        idMap.remove("@timestamp");
        idMap.remove("url");
        String id = MD5Util.md5(JSON.toJSONString(idMap));
        return id;
    }
}
