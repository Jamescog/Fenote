from passlib.crypto import encrypt, decrypt

# Encryption key
encryption_key = "your_encryption_key"

# Encrypt the email
email = "example@example.com"
encrypted_email = encrypt(encryption_key, email)

# Decrypt the email
decrypted_email = decrypt(encryption_key, encrypted_email)

print("Original Email:", email)
print("Encrypted Email:", encrypted_email)
print("Decrypted Email:", decrypted_email)

