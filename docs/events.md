---
sidebar_position: 4
---

# Eventos

En este momento, los eventos que enviamos por Webhooks tienen la siguiente estructura:

### 1. Para intentos de validación (*validation attempts*):

  * Validación exitosa:

```javascript
{
  id: "evt_...",
  name: "validation_attempt.successful",
  payload: {
    user_reference: "<user-reference>",
    validation_attempt_id: "va_...",
    identity_id: "id_..."
  },
  created_at: "<created_at>"
}
```

  * Validación fallida:

```javascript
{
  id: "evt_...",
  name: "validation_attempt.failed",
  payload: {
    user_reference: "<user-reference>",
    validation_attempt_id: "va_...",
    error_reason: "passive_liveness_verification_not_passed",
    errors_array: [
      {
        code: "auth-XXX",
        type: "facial",
        message: "passive_liveness_verification_not_passed",
        detail: "La verificación de vivacidad pasiva no fue exitosa."
      },
      ...
    ]
  },
  created_at: "<created_at>"
}
```

### 2. Para intentos de autenticación (*auth attempts*):

  * Autenticación exitosa:

```javascript
{
  id: "evt_...",
  name: "auth_attempt.successful",
  payload: {
    user_reference: "<user-reference>",
    auth_attempt_id: "aa_...",
    identity_id: "id_..."
  },
  created_at: "<created_at>"
}
```

  * Autenticación fallida:

```javascript
{
  id: "evt_...",
  name: "auth_attempt.failed",
  payload: {
    user_reference: "<user-reference>",
    auth_attempt_id: "aa_...",
    error_reason: "passive_liveness_verification_not_passed",
    errors_array: [
      {
        code: "auth-XXX",
        type: "facial",
        message: "passive_liveness_verification_not_passed",
        detail: "La verificación de vivacidad pasiva no fue exitosa."
      },
      ...
    ]
  },
  created_at: "<created_at>"
}
```

## Tipos de errores:

Los tipos de errores que pueden aparecer en el campo de `error_reason` son los siguientes:

1. `unknown`
2. `facial_validation_error`
3. `document_validation_error`
4. `expiration_error`
5. `enrollment`
6. `age_above_threshold`
7. `blurry_image`
8. `data_not_match_with_government_database`
9. `document_has_expired`
10. `document_not_recognized`
11. `document_unregistered`
12. `front_document_not_found`
13. `government_database_unavailable`
14. `identity_belongs_to_dead_person`
15. `invalid_or_corrupted_image_file`
16. `missing_date_of_birth`
17. `missing_document_number`
18. `missing_expiration_date`
19. `missing_gender`
20. `missing_mrz`
21. `missing_names`
22. `missing_text`
23. `ocr_no_text_detected`
24. `underage`
25. `fraudster_face_match_in_client_collection`
26. `liveness_verification_not_passed`
27. `no_face_detected`
28. `passive_liveness_verification_not_passed`
29. `photo_of_photo`
30. `similarity_threshold_not_passed`
31. `camera_permission_error`
32. `damaged_document`
33. `date_of_birth_does_not_match_with_photo`
34. `document_is_a_photo_of_photo`
35. `document_is_a_photocopy`
36. `face_not_clear`
37. `face_not_detected`
38. `image_validation_not_passed`
39. `incomplete_document`
40. `invalid_format`
41. `invalid_issue_date`
42. `missing_issue_date`
43. `missing_nationality`
44. `possible_fraud`
45. `reverse_document_not_found`
46. `validations_failed`
