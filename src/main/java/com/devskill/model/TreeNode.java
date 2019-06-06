package com.devskill.model;

import com.devskill.domain.Page;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
@EqualsAndHashCode
public class TreeNode<T> {

    private T object;

    private TreeNode parent;

    private List<TreeNode<T>> children = new ArrayList<>();

    public TreeNode(T object) {
        this.object = object;
    }

    public T getObject() {
        return object;
    }

    public TreeNode getParent() {
        return parent;
    }

    public void setParent(TreeNode parent) {
        this.parent = parent;
    }

    public List<TreeNode<T>> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode<T>> children) {
        this.children = children;
    }

    public boolean contains(Page page) {
        if (getObject().equals(page)) {
            return true;
        }
        for (TreeNode node : getChildren()) {
            if (node.contains(page)) {
                return true;
            }
        }
        return false;
    }
}
