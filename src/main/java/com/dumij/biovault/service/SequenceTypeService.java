package com.dumij.biovault.service;

import com.dumij.biovault.dto.SequenceTypeDTO;
import com.dumij.biovault.model.SequenceType;
import com.dumij.biovault.repository.SequenceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SequenceTypeService {

    @Autowired
    private SequenceTypeRepository repository;

    public List<SequenceTypeDTO> getAllTypes() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SequenceTypeDTO createType(SequenceTypeDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Sequence type payload is required");
        }

        String name = normalizeName(dto.getName());
        if (name.isEmpty()) {
            throw new IllegalArgumentException("Sequence type name cannot be empty");
        }

        if (repository.findByNameIgnoreCase(name).isPresent()) {
            throw new IllegalArgumentException("A sequence type with this name already exists");
        }

        SequenceType entity = new SequenceType();
        entity.setName(name);
        entity.setDescription(dto.getDescription());

        SequenceType savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    public SequenceTypeDTO updateType(String id, SequenceTypeDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Sequence type payload is required");
        }

        SequenceType entity = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sequence Type not found with id: " + id));

        String name = normalizeName(dto.getName());
        if (name.isEmpty()) {
            throw new IllegalArgumentException("Sequence type name cannot be empty");
        }

        entity.setName(name);
        entity.setDescription(dto.getDescription());

        SequenceType updatedEntity = repository.save(entity);
        return convertToDTO(updatedEntity);
    }

    public void deleteType(String id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Sequence Type not found with id: " + id);
        }
        repository.deleteById(id);
    }

    private String normalizeName(String name) {
        if (name == null) {
            return "";
        }
        return name.trim();
    }

    private SequenceTypeDTO convertToDTO(SequenceType entity) {
        return new SequenceTypeDTO(entity.getId(), entity.getName(), entity.getDescription());
    }
}
