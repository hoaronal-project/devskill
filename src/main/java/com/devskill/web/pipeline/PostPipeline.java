package com.devskill.web.pipeline;

import com.devskill.domain.Post;
import com.devskill.repository.PostRepository;
import org.springframework.stereotype.Service;
import us.codecraft.webmagic.ResultItems;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.pipeline.Pipeline;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class PostPipeline implements Pipeline {

    @Resource
    protected PostRepository postRepository;

    @Override
    public void process(ResultItems resultItems, Task task) {
        for (Map.Entry<String, Object> entry : resultItems.getAll().entrySet()) {
            if (entry.getKey().contains("newPostViblo")) {
                Post post = (Post) entry.getValue();
                post.setLanguage("vi");
                post.setStatus(Post.Status.PUBLISHED);
                post.setCreatedAt(LocalDateTime.now());
                post.setUpdatedAt(LocalDateTime.now());
                postRepository.save(post);
            }

        }
    }
}