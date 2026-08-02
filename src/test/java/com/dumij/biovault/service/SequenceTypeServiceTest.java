package com.dumij.biovault.service;

import com.dumij.biovault.dto.SequenceTypeDTO;
import com.dumij.biovault.model.SequenceType;
import com.dumij.biovault.repository.SequenceTypeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SequenceTypeServiceTest {

    @Mock
    private SequenceTypeRepository repository;

    @InjectMocks
    private SequenceTypeService service;

    @Test
    void createTypeShouldRejectDuplicateNamesCaseInsensitively() {
        SequenceType existing = new SequenceType();
        existing.setId("1");
        existing.setName("DNA");

        when(repository.findByNameIgnoreCase("dna")).thenReturn(Optional.of(existing));

        SequenceTypeDTO dto = new SequenceTypeDTO();
        dto.setName("dna");

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> service.createType(dto));

        assertEquals("A sequence type with this name already exists", exception.getMessage());
    }
}
