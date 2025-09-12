package com.learndock.learndock.service.system;

import com.learndock.learndock.api.dto.system.HardwareStats;
import com.sun.management.OperatingSystemMXBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.lang.management.ManagementFactory;
import java.util.Optional;

@Service
public class ResourceInfoService {

    private static final Logger logger = LoggerFactory.getLogger(ResourceInfoService.class);

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    public Optional<HardwareStats> getHardwareStats() {
        OperatingSystemMXBean osBean = ManagementFactory.getPlatformMXBean(OperatingSystemMXBean.class);
        return Optional.of(new HardwareStats(
                osBean.getProcessCpuLoad() * 100,
                osBean.getTotalMemorySize() / (1024 * 1024),
                osBean.getFreeMemorySize() / (1024 * 1024),
                osBean.getTotalSwapSpaceSize() / (1024 * 1024),
                osBean.getFreeSwapSpaceSize() / (1024 * 1024),
                new File("/").getTotalSpace() / (1024 * 1024),
                new File("/").getFreeSpace() / (1024 * 1024),
                ManagementFactory.getRuntimeMXBean().getUptime()
        ));
    }

    public Optional<Long> getDatabaseFileSize() {
        try {
            String prefix = "jdbc:h2:file:./";
            if (datasourceUrl != null && datasourceUrl.startsWith(prefix)) {
                String dbFilePath = datasourceUrl.substring(prefix.length()) + ".mv.db";
                File dbFile = new File(dbFilePath);
                if (dbFile.exists() && dbFile.isFile()) {
                    return Optional.of(dbFile.length()); // size in bytes
                }
            }
        } catch (Exception e) {
            logger.error("Failed to get database file size", e);
        }
        return Optional.empty();
    }

    public Optional<Long> getDatabaseFileSizeInKB() {
        Optional<Long> sizeInBytes = getDatabaseFileSize();
        return sizeInBytes.map(bytes -> bytes / 1024);
    }
}
