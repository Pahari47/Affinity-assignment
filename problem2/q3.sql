SELECT
  f.rfam_acc AS family_accession_id,
  f.rfam_id  AS family_name,
  MAX(rf.length) AS max_dna_sequence_length
FROM family f
JOIN full_region fr
  ON f.rfam_acc = fr.rfam_acc
JOIN rfamseq rf
  ON fr.rfamseq_acc = rf.rfamseq_acc
GROUP BY
  f.rfam_acc,
  f.rfam_id
HAVING
  MAX(rf.length) > 1000000
ORDER BY
  max_dna_sequence_length DESC
LIMIT 15 OFFSET 120;


the response should be:

+---------------------+--------------+-------------------------+
| family_accession_id | family_name  | max_dna_sequence_length |
+---------------------+--------------+-------------------------+
| RF01219             | snoR100      |               836514780 |
| RF01220             | snoR104      |               836514780 |
| RF01224             | snoR80       |               836514780 |
| RF01227             | snoR83       |               836514780 |
| RF01284             | snoR8a       |               836514780 |
| RF01286             | snoR26       |               836514780 |
| RF01292             | snoR2        |               836514780 |
| RF01300             | snoU49       |               836514780 |
| RF01847             | Plant_U3     |               836514780 |
| RF01848             | ACEA_U3      |               836514780 |
| RF01856             | Protozoa_SRP |               836514780 |
| RF01911             | MIR2118      |               836514780 |
| RF03160             | twister-P1   |               836514780 |
| RF03209             | MIR9657      |               836514780 |
| RF03674             | MIR5387      |               836514780 |
+---------------------+--------------+-------------------------+