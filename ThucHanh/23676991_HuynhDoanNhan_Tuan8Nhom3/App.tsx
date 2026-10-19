import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_API = 'https://6ad5bb7d48476c0785d9a459.mockapi.io/users';
const BOOKS_API = 'https://6ad5bb7d48476c0785d9a459.mockapi.io/books';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Review = {
  id: string;
  userId?: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: string;
};

type Book = {
  id: string;
  title: string;
  author: string;
  category?: string;
  price: number;
  image?: string;
  description?: string;
  reviews: Review[];
};

type RatingStarsProps = {
  value: number;
  size?: number;
  onSelect?: (rating: number) => void;
};

function RatingStars({ value, size = 18, onSelect }: RatingStarsProps) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          disabled={!onSelect}
          onPress={() => onSelect && onSelect(star)}
        >
          <Text
            style={[
              styles.starText,
              {
                fontSize: size,
                color: star <= Math.round(value) ? '#f5a623' : '#ccc'
              }
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const authService = {
  login: async (email: string, password: string) => {
    const res = await fetch(USERS_API);

    if (!res.ok) {
      throw new Error('Không thể kết nối API');
    }

    const users: User[] = await res.json();

    const user = users.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    const token = 'token_' + user.id + '_' + Date.now();

    return { token, user };
  },

  register: async (email: string, password: string, fullName: string) => {
    const checkRes = await fetch(USERS_API);

    if (!checkRes.ok) {
      throw new Error('Không thể kiểm tra tài khoản');
    }

    const users: User[] = await checkRes.json();

    const exists = users.some(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (exists) {
      throw new Error('Email này đã tồn tại');
    }

    const res = await fetch(USERS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        email: email.trim().toLowerCase(),
        password
      })
    });

    if (!res.ok) {
      throw new Error('Đăng ký thất bại');
    }

    return await res.json();
  }
};

export default function App() {
  const [auth, setAuth] = useState<{ token: string; user: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [screen, setScreen] = useState<'home' | 'auth' | 'checkout' | 'bookDetail'>('home');
  const [redirectScreen, setRedirectScreen] = useState<'checkout' | 'bookDetail' | null>(null);
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        const stored = await AsyncStorage.getItem('auth');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.token) {
            setAuth(parsed);
          }
        }
      } catch (err) {
      }

      try {
        const res = await fetch(BOOKS_API);
        if (res.ok) {
          const data: Book[] = await res.json();
          setBooks(data);
          if (data.length > 0) {
            setSelectedBook(data[0]);
          }
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  const validate = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (tab === 'register') {
      if (!fullName.trim()) {
        setFullNameError('Vui lòng nhập họ và tên');
        isValid = false;
      } else {
        setFullNameError('');
      }
    }

    if (!email.trim()) {
      setEmailError('Vui lòng nhập email');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Email không đúng định dạng');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu tối thiểu 6 ký tự');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (tab === 'login') {
        const data = await authService.login(email.trim(), password);
        await AsyncStorage.setItem('auth', JSON.stringify(data));
        setAuth(data);
        setEmail('');
        setPassword('');
        if (redirectScreen) {
          setScreen(redirectScreen);
          setRedirectScreen(null);
        } else {
          setScreen('home');
        }
      } else {
        await authService.register(email.trim(), password, fullName.trim());
        Alert.alert('Thành công', 'Đăng ký thành công! Vui lòng đăng nhập.');
        setTab('login');
        setPassword('');
      }
      setFullNameError('');
      setEmailError('');
      setPasswordError('');
    } catch (err: any) {
      Alert.alert('Thông báo', err.message || 'Có lỗi xảy ra');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth');
    setAuth(null);
    setScreen('home');
    setRedirectScreen(null);
  };

  const handleGoToCheckout = () => {
    if (auth) {
      setScreen('checkout');
    } else {
      setRedirectScreen('checkout');
      setTab('login');
      setScreen('auth');
    }
  };

  const handleAddReview = async () => {
    if (!auth) {
      Alert.alert('Thông báo', 'Vui lòng đăng nhập để gửi đánh giá');
      return;
    }

    if (!reviewComment.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập bình luận');
      return;
    }

    if (!selectedBook) return;

    setSubmittingReview(true);

    const newReview: Review = {
      id: 'r_' + Date.now(),
      userId: auth.user?.id || '1',
      userName: auth.user?.name || auth.user?.fullName || auth.user?.email || 'Người dùng',
      rating: reviewRating,
      comment: reviewComment.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedReviews = [newReview, ...(selectedBook.reviews || [])];

    try {
      let res = await fetch(`${BOOKS_API}/${selectedBook.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });

      if (!res.ok) {
        res = await fetch(`${BOOKS_API}/${selectedBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...selectedBook,
            reviews: updatedReviews
          })
        });
      }

      const updatedBook = { ...selectedBook, reviews: updatedReviews };
      setSelectedBook(updatedBook);
      setBooks((prev) =>
        prev.map((b) => (b.id === selectedBook.id ? updatedBook : b))
      );
      setReviewComment('');
      setReviewRating(5);
      Alert.alert('Thành công', 'Đánh giá đã được gửi thành công!');
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Không thể gửi đánh giá');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (screen === 'checkout') {
    if (!auth) {
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Truy cập bị chặn</Text>
          <Text style={styles.welcome}>Bạn phải đăng nhập để vào Checkout</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setRedirectScreen('checkout');
              setTab('login');
              setScreen('auth');
            }}
          >
            <Text style={styles.buttonText}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.title}>Màn hình Checkout</Text>
          <Text style={styles.welcome}>
            Người nhận: {auth.user?.name || auth.user?.email}
          </Text>
          <Text style={styles.infoText}>
            Đơn hàng: {selectedBook ? selectedBook.title : 'Sách mẫu'}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Thông báo', 'Đặt hàng thành công!')}
          >
            <Text style={styles.buttonText}>Xác nhận thanh toán</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setScreen('home')}
          >
            <Text style={styles.buttonText}>Quay lại Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'bookDetail' && selectedBook) {
    const reviews = selectedBook.reviews || [];
    const relatedBooks = books.filter(
      (b) => b.category === selectedBook.category && b.id !== selectedBook.id
    );
    const averageRating =
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
            reviews.length
          ).toFixed(1)
        : '0';

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={[styles.backButton]}
            onPress={() => setScreen('home')}
          >
            <Text style={styles.backButtonText}>← Quay lại danh sách sách</Text>
          </TouchableOpacity>

          <View style={styles.bookHeaderCard}>
            <Text style={styles.bookTitle}>{selectedBook.title}</Text>
            <Text style={styles.bookAuthor}>Tác giả: {selectedBook.author}</Text>
            <Text style={styles.bookPrice}>
              Giá: {selectedBook.price.toLocaleString()} đ
            </Text>
            {selectedBook.description ? (
              <Text style={styles.bookDescription}>{selectedBook.description}</Text>
            ) : null}

            <View style={styles.ratingSummaryRow}>
              <Text style={styles.averageRatingNumber}>{averageRating} / 5</Text>
              <RatingStars value={Number(averageRating)} size={22} />
              <Text style={styles.ratingCount}>({reviews.length} đánh giá)</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGoToCheckout}>
              <Text style={styles.buttonText}>Mua ngay / Thanh toán</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Đánh giá từ độc giả</Text>
            {reviews.length === 0 ? (
              <Text style={styles.emptyText}>Chưa có đánh giá nào cho cuốn sách này.</Text>
            ) : (
              reviews.map((item, index) => (
                <View key={item.id || index} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewUser}>{item.userName}</Text>
                    <RatingStars value={item.rating} size={15} />
                  </View>
                  <Text style={styles.reviewComment}>{item.comment}</Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Gửi đánh giá mới</Text>
            {auth ? (
              <View>
                <View style={styles.formRatingRow}>
                  <Text style={styles.label}>Chọn số sao:</Text>
                  <RatingStars
                    value={reviewRating}
                    size={26}
                    onSelect={setReviewRating}
                  />
                </View>
                <TextInput
                  style={[styles.input, styles.commentInput]}
                  placeholder="Nhập bình luận của bạn..."
                  value={reviewComment}
                  onChangeText={setReviewComment}
                  multiline
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAddReview}
                  disabled={submittingReview}
                >
                  {submittingReview ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Gửi đánh giá</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.loginToReviewBox}>
                <Text style={styles.loginToReviewText}>
                  Vui lòng đăng nhập để gửi đánh giá
                </Text>
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => {
                    setRedirectScreen('bookDetail');
                    setTab('login');
                    setScreen('auth');
                  }}
                >
                  <Text style={styles.buttonText}>Đăng nhập ngay</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Sách liên quan</Text>
            {relatedBooks.length === 0 ? (
              <Text style={styles.emptyText}>Không có sách liên quan cùng danh mục.</Text>
            ) : (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={relatedBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const itemReviews = item.reviews || [];
                  const itemAvg =
                    itemReviews.length > 0
                      ? (
                          itemReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
                          itemReviews.length
                        ).toFixed(1)
                      : '0';

                  return (
                    <TouchableOpacity
                      style={styles.relatedCard}
                      onPress={() => setSelectedBook(item)}
                    >
                      <Text style={styles.relatedTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={styles.relatedAuthor} numberOfLines={1}>
                        {item.author}
                      </Text>
                      <Text style={styles.relatedPrice}>
                        {item.price ? item.price.toLocaleString() : 0} đ
                      </Text>
                      <View style={styles.cardRatingRow}>
                        <RatingStars value={Number(itemAvg)} size={13} />
                        <Text style={styles.cardRatingText}>{itemAvg}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerBox}>
            <Text style={styles.title}>Ứng dụng Mua Sách</Text>
            {auth ? (
              <View style={styles.userBox}>
                <Text style={styles.welcome}>
                  Xin chào, {auth.user?.name || auth.user?.fullName || auth.user?.email}!
                </Text>
                <View style={styles.rowButtons}>
                  <TouchableOpacity
                    style={[styles.smallButton, styles.primaryButton]}
                    onPress={handleGoToCheckout}
                  >
                    <Text style={styles.buttonText}>Thanh toán</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.smallButton, styles.logoutButton]}
                    onPress={handleLogout}
                  >
                    <Text style={styles.buttonText}>Đăng xuất</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.userBox}>
                <Text style={styles.welcome}>Bạn chưa đăng nhập</Text>
                <View style={styles.rowButtons}>
                  <TouchableOpacity
                    style={[styles.smallButton, styles.primaryButton]}
                    onPress={handleGoToCheckout}
                  >
                    <Text style={styles.buttonText}>Thanh toán</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.smallButton, styles.secondaryButton]}
                    onPress={() => {
                      setRedirectScreen(null);
                      setTab('login');
                      setScreen('auth');
                    }}
                  >
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <Text style={styles.listTitle}>Danh sách sách nổi bật</Text>

          {books.map((b) => {
            const bReviews = b.reviews || [];
            const bAvg =
              bReviews.length > 0
                ? (
                    bReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
                    bReviews.length
                  ).toFixed(1)
                : '0';

            return (
              <View key={b.id} style={styles.bookCard}>
                <Text style={styles.cardTitle}>{b.title}</Text>
                <Text style={styles.cardAuthor}>Tác giả: {b.author}</Text>
                <Text style={styles.cardPrice}>
                  Giá: {b.price ? b.price.toLocaleString() : 0} đ
                </Text>
                <View style={styles.cardRatingRow}>
                  <RatingStars value={Number(bAvg)} size={16} />
                  <Text style={styles.cardRatingText}>
                    {bAvg} ({bReviews.length})
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.viewDetailButton]}
                  onPress={() => {
                    setSelectedBook(b);
                    setScreen('bookDetail');
                  }}
                >
                  <Text style={styles.buttonText}>Xem chi tiết & Đánh giá</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {redirectScreen && (
          <Text style={styles.redirectNotice}>
            Vui lòng đăng nhập để tiếp tục
          </Text>
        )}

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, tab === 'login' && styles.activeTab]}
            onPress={() => {
              setTab('login');
              setFullNameError('');
              setEmailError('');
              setPasswordError('');
            }}
          >
            <Text style={[styles.tabText, tab === 'login' && styles.activeTabText]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'register' && styles.activeTab]}
            onPress={() => {
              setTab('register');
              setFullNameError('');
              setEmailError('');
              setPasswordError('');
            }}
          >
            <Text style={[styles.tabText, tab === 'register' && styles.activeTabText]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>

        {tab === 'register' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
              style={[styles.input, fullNameError ? styles.inputError : null]}
              placeholder="Nhập họ và tên"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (fullNameError) setFullNameError('');
              }}
            />
            {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Nhập email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => {
            setRedirectScreen(null);
            setScreen('home');
          }}
        >
          <Text style={styles.buttonText}>Quay lại Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  headerBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  userBox: {
    marginTop: 8
  },
  rowButtons: {
    flexDirection: 'row',
    marginTop: 8
  },
  smallButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4
  },
  primaryButton: {
    backgroundColor: '#0066cc'
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222'
  },
  cardAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  cardPrice: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
    marginTop: 4
  },
  cardRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  cardRatingText: {
    fontSize: 13,
    color: '#777',
    marginLeft: 6
  },
  viewDetailButton: {
    marginTop: 10,
    backgroundColor: '#0288d1'
  },
  backButton: {
    marginBottom: 12
  },
  backButtonText: {
    color: '#0066cc',
    fontSize: 15,
    fontWeight: '600'
  },
  bookHeaderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111'
  },
  bookAuthor: {
    fontSize: 15,
    color: '#555',
    marginTop: 6
  },
  bookPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginTop: 8
  },
  bookDescription: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
    lineHeight: 20
  },
  ratingSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  averageRatingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8
  },
  ratingCount: {
    fontSize: 14,
    color: '#777',
    marginLeft: 8
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic'
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20
  },
  formRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  commentInput: {
    minHeight: 80,
    textAlignVertical: 'top'
  },
  loginToReviewBox: {
    alignItems: 'center',
    paddingVertical: 10
  },
  loginToReviewText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066cc'
  },
  tabText: {
    fontSize: 16,
    color: '#666'
  },
  activeTabText: {
    color: '#0066cc',
    fontWeight: 'bold'
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
    marginRight: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16
  },
  inputError: {
    borderColor: '#d32f2f'
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    width: '100%'
  },
  secondaryButton: {
    backgroundColor: '#6c757d'
  },
  logoutButton: {
    backgroundColor: '#d32f2f'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111'
  },
  welcome: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 20
  },
  redirectNotice: {
    color: '#e65100',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500'
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  starText: {
    marginHorizontal: 1
  },
  relatedCard: {
    width: 140,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  relatedTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    height: 36
  },
  relatedAuthor: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  relatedPrice: {
    fontSize: 12,
    color: '#d32f2f',
    fontWeight: '600',
    marginTop: 4
  }
});
