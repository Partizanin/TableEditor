package spring.services;

import spring.model.User;

import java.util.List;

public class PageContainer {
    private long totalElements;
    private int totalPages;
    private List<User> data;

    public PageContainer() {
    }

    public PageContainer(long totalElements, int totalPages, List<User> data) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.data = data;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(int totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public List<User> getData() {
        return data;
    }

    public void setData(List<User> data) {
        this.data = data;
    }
}
