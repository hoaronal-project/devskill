package com.devskill.common.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.RemovalListener;
import com.google.common.io.Files;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.nio.channels.FileLock;
import java.util.Arrays;
import java.util.List;

public class FileSystemPersistingCache<K, V> extends AbstractPersistingCache<K, V> {

    private static final Logger LOGGER = LoggerFactory.getLogger(FileSystemPersistingCache.class);

    private final File persistenceRootDirectory;

    protected FileSystemPersistingCache(CacheBuilder<Object, Object> cacheBuilder) {
        this(cacheBuilder, Files.createTempDir());
    }

    protected FileSystemPersistingCache(CacheBuilder<Object, Object> cacheBuilder, File persistenceDirectory) {
        this(cacheBuilder, persistenceDirectory, null);
    }

    protected FileSystemPersistingCache(CacheBuilder<Object, Object> cacheBuilder, RemovalListener<K, V> removalListener) {
        this(cacheBuilder, Files.createTempDir(), removalListener);
    }

    protected FileSystemPersistingCache(CacheBuilder<Object, Object> cacheBuilder, File persistenceDirectory, RemovalListener<K, V> removalListener) {
        super(cacheBuilder, removalListener);
        this.persistenceRootDirectory = validateDirectory(persistenceDirectory);
        LOGGER.info("Persisting to {}", persistenceDirectory.getAbsolutePath());
    }

    private File validateDirectory(File directory) {
        directory.mkdirs();
        if (!directory.exists() || !directory.isDirectory() || !directory.canRead() || !directory.canWrite()) {
            throw new IllegalArgumentException(String.format("Directory %s cannot be used as a persistence directory",
              directory.getAbsolutePath()));
        }
        return directory;
    }

    private File pathToFileFor(K key) {
        List<String> pathSegments = directoryFor(key);
        File persistenceFile = persistenceRootDirectory;
        for (String pathSegment : pathSegments) {
            persistenceFile = new File(persistenceFile, pathSegment);
        }
        if (persistenceRootDirectory.equals(persistenceFile) || persistenceFile.isDirectory()) {
            throw new IllegalArgumentException();
        }
        return persistenceFile;
    }

    @Override
    protected V findPersisted(K key) throws IOException {
        if (!isPersist(key)) return null;
        File persistenceFile = pathToFileFor(key);
        if (!persistenceFile.exists()) return null;
        FileInputStream fileInputStream = new FileInputStream(persistenceFile);
        try {
            FileLock fileLock = fileInputStream.getChannel().lock(0, Long.MAX_VALUE, true);
            try {
                return readPersisted(key, fileInputStream);
            } finally {
                fileLock.release();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally {
            fileInputStream.close();
        }
    }

    @Override
    protected void persistValue(K key, V value) throws IOException {
        if (!isPersist(key)) return;
        File persistenceFile = pathToFileFor(key);
        persistenceFile.getParentFile().mkdirs();
        FileOutputStream fileOutputStream = new FileOutputStream(persistenceFile);
        try {
            FileLock fileLock = fileOutputStream.getChannel().lock();
            try {
                persist(key, value, fileOutputStream);
            } finally {
                fileLock.release();
            }
        } finally {
            fileOutputStream.close();
        }
    }

    @Override
    protected void persist(K key, V value, OutputStream outputStream) throws IOException {
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(outputStream);
        objectOutputStream.writeObject(value);
        objectOutputStream.flush();
    }

    @Override
    protected boolean isPersist(K key) {
        return true;
    }

    @Override
    protected List<String> directoryFor(K key) {
        return Arrays.asList(key.toString());
    }

    @Override
    @SuppressWarnings("unchecked")
    protected V readPersisted(K key, InputStream inputStream) throws IOException {
        try {
            return (V) new ObjectInputStream(inputStream).readObject();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(String.format("Serialized version assigned by %s was invalid", key), e);
        }
    }

    @Override
    protected void deletePersistedIfExistent(K key) {
        File file = pathToFileFor(key);
        file.delete();
    }

    @Override
    protected void deleteAllPersisted() {
        for (File file : persistenceRootDirectory.listFiles()) {
            file.delete();
        }
    }

    @Override
    protected int sizeOfPersisted() {
        return countFilesInFolders(persistenceRootDirectory);
    }

    private int countFilesInFolders(File directory) {
        int size = 0;
        for (File file : directory.listFiles()) {
            if (file.isDirectory()) {
                size += countFilesInFolders(file);
            } else if (!file.getName().startsWith(".")) {
                size++;
            }
        }
        return size;
    }

    public File getPersistenceRootDirectory() {
        return persistenceRootDirectory;
    }
}
