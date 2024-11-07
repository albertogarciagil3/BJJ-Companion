import React, { useState, useEffect } from 'react';

const Technique = ({ technique, updateTechnique, deleteTechnique }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(technique.name || '');
    const [techniqueType, setTechniqueType] = useState(technique.techniqueType || []);
    const [positionStart, setPositionStart] = useState(technique.positionStart || '');
    const [temporalPositions, setTemporalPositions] = useState(technique.temporalPositions || []);
    const [endPosition, setEndPosition] = useState(technique.endPosition || '');
    const [ifScenarios, setIfScenarios] = useState(technique.ifScenarios || []);
    const [relatedEntries, setRelatedEntries] = useState(technique.relatedEntries || []);
    const [relatedPositions, setRelatedPositions] = useState(technique.relatedPositions || []);
    const [relatedTechniques, setRelatedTechniques] = useState(technique.relatedTechniques || []);
    const [media, setMedia] = useState(technique.media || []);
    const [proficiencyLevel, setProficiencyLevel] = useState(technique.proficiencyLevel || 1);
    const [giNoGi, setGiNoGi] = useState(technique.giNoGi || 'both');
    const [practiceToday, setPracticeToday] = useState(technique.practiceToday || false);
    const [TechniqueCustomFields, setTechniqueCustomFields] = useState(technique.TechniqueCustomFields || {});

    const handleBlur = () => {
        setIsEditing(false);
        updateTechnique({
            ...technique,
            name,
            techniqueType,
            positionStart,
            temporalPositions,
            endPosition,
            ifScenarios,
            relatedEntries,
            relatedPositions,
            relatedTechniques,
            media,
            proficiencyLevel,
            giNoGi,
            practiceToday,
            TechniqueCustomFields
        });
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleBlur}
                        placeholder="Nombre de la Técnica"
                    />
                    <input
                        type="text"
                        value={techniqueType.join(', ')}
                        onChange={(e) => setTechniqueType(e.target.value.split(',').map(t => t.trim()))}
                        onBlur={handleBlur}
                        placeholder="Tipos de Técnica (separados por comas)"
                    />
                    <input
                        type="text"
                        value={positionStart}
                        onChange={(e) => setPositionStart(e.target.value)}
                        onBlur={handleBlur}
                        placeholder="Posición de Inicio"
                    />
                    <input
                        type="text"
                        value={temporalPositions.join(', ')}
                        onChange={(e) => setTemporalPositions(e.target.value.split(',').map(t => t.trim()))}
                        onBlur={handleBlur}
                        placeholder="Posiciones Temporales (separadas por comas)"
                    />
                    <input
                        type="text"
                        value={endPosition}
                        onChange={(e) => setEndPosition(e.target.value)}
                        onBlur={handleBlur}
                        placeholder="Posición Final"
                    />
                    <input
                        type="text"
                        value={ifScenarios.join(', ')}
                        onChange={(e) => setIfScenarios(e.target.value.split(',').map(t => t.trim()))}
                        onBlur={handleBlur}
                        placeholder="IFs (separados por comas)"
                    />
                    <input
                        type="text"
                        value={relatedEntries.join(', ')}
                        onChange={(e) => setRelatedEntries(e.target.value.split(',').map(t => t.trim()))}
                        onBlur={handleBlur}
                        placeholder="Entries Relacionados (separados por comas)"
                    />
                    <input
                        type="text"
                        value={relatedPositions.join(', ')}
                        onChange={(e) => setRelatedPositions(e.target.value.split(',').map(t => t.trim()))}
                        onBlur={handleBlur}
                        placeholder="Posiciones Relacionadas (separadas por comas)"
                    />
                    <input
                        type="text"
                        value={relatedTechniques.join(', ')}
                        onChange={(e) => setRelatedTechniques(e.target.value.split(',').map(t => t.trim()))}
                        onBlur={handleBlur}
                        placeholder="Técnicas Relacionadas (separadas por comas)"
                    />
                    <input
                        type="text"
                        value={media.join(', ')}
                        onChange={(e) => setMedia(e.target.value.split(',').map(t => t.trim()))}
                        onBlur={handleBlur}
                        placeholder="Media (URLs separadas por comas)"
                    />
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={proficiencyLevel}
                        onChange={(e) => setProficiencyLevel(Number(e.target.value))}
                        onBlur={handleBlur}
                        placeholder="Nivel de Proficiencia (1-10)"
                    />
                    <select
                        value={giNoGi}
                        onChange={(e) => setGiNoGi(e.target.value)}
                        onBlur={handleBlur}
                    >
                        <option value="gi">Gi</option>
                        <option value="nogi">No Gi</option>
                        <option value="both">Ambos</option>
                    </select>
                    <label>
                        Practicar Hoy:
                        <input
                            type="checkbox"
                            checked={practiceToday}
                            onChange={(e) => setPracticeToday(e.target.checked)}
                        />
                    </label>
                    <textarea
                        value={JSON.stringify(TechniqueCustomFields, null, 2)}
                        onChange={(e) => setTechniqueCustomFields(JSON.parse(e.target.value))}
                        onBlur={handleBlur}
                        placeholder="Campos Personalizados (formato JSON)"
                    />
                </>
            ) : (
                <>
                    <h3>{name}</h3>
                    <p><strong>Tipo:</strong> {techniqueType.join(', ')}</p>
                    <p><strong>Posición de Inicio:</strong> {positionStart}</p>
                    <p><strong>Posiciones Temporales:</strong> {temporalPositions.join(', ') || 'N/A'}</p>
                    <p><strong>Posición Final:</strong> {endPosition || 'N/A'}</p>
                    <p><strong>IF:</strong> {ifScenarios.join(', ') || 'N/A'}</p>
                    <p><strong>Entries Relacionados:</strong> {relatedEntries.join(', ') || 'N/A'}</p>
                    <p><strong>Posiciones Relacionadas:</strong> {relatedPositions.join(', ') || 'N/A'}</p>
                    <p><strong>Técnicas Relacionadas:</strong> {relatedTechniques.join(', ') || 'N/A'}</p>
                    <p><strong>Media:</strong> {media.join(', ') || 'N/A'}</p>
                    <p><strong>Nivel de Proficiencia:</strong> {proficiencyLevel}</p>
                    <p><strong>Gi/No Gi:</strong> {giNoGi}</p>
                    <p><strong>Practicar Hoy:</strong> {practiceToday ? 'Sí' : 'No'}</p>
                    <p><strong>Campos Personalizados:</strong> {JSON.stringify(TechniqueCustomFields, null, 2)}</p>
                    <button onClick={() => setIsEditing(true)} style={{ marginRight: '0.5rem' }}>Editar</button>
                    <button onClick={() => deleteTechnique(technique._id)} style={{ color: 'red' }}>Eliminar</button>
                </>
            )}
        </div>
    );
};

export default Technique;
