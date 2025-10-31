import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

const colors = {
  primary: theme.colors.info.main,
  success: theme.colors.success.main,
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  neutralMedium: theme.colors.text.tertiary,
  border: theme.colors.border.light,
  timelineAxis: '#DBE6E1',
  timelineNode: '#DBE6E1',
};

export interface Bill {
  id: string;
  companyName: string;
  companyLogo?: string;
  amount: number;
  dueDate: Date;
  isPaid: boolean;
  category?: string;
}

export interface UpcomingBillsWidgetProps {
  bills: Bill[];
  onSeeAllBills?: () => void;
  onBillPress?: (bill: Bill) => void;
}

/**
 * Format due date as "Due in X days" or "Due 2 Aug"
 */
const formatDueDate = (dueDate: Date): string => {
  const today = new Date();

  // Reset time parts for accurate day comparison
  const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = dueDateOnly.getTime() - todayOnly.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else if (diffDays > 1 && diffDays <= 7) {
    return `Due in ${diffDays} days`;
  } else {
    // Format as "Due 2 Aug"
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `Due ${dueDate.getDate()} ${months[dueDate.getMonth()]}`;
  }
};

export const UpcomingBillsWidget: React.FC<UpcomingBillsWidgetProps> = ({
  bills,
  onSeeAllBills,
  onBillPress,
}) => {
  // Sort bills by due date and filter unpaid
  const sortedBills = [...bills]
    .filter((bill) => !bill.isPaid)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 10); // Show max 10 bills

  // Empty state - all bills paid
  if (sortedBills.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upcoming Bills</Text>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-done-circle" size={64} color={colors.success} />
          <Text style={styles.emptyTitle}>All bills paid!</Text>
          <Text style={styles.emptySubtitle}>
            No upcoming bills this month.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Title and Action Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Bills</Text>
        {onSeeAllBills && (
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={onSeeAllBills}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>See All Bills</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Scrolling Timeline */}
      <View style={styles.timelineContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.timelineContent}
        >
          {/* Timeline Axis - Background horizontal line */}
          <View style={styles.timelineAxis} />

          {/* Timeline Items */}
          <View style={styles.timelineItems}>
            {/* TODAY MARKER */}
            <View style={styles.todayMarker}>
              <View style={styles.todayCard}>
                <View style={styles.todayIconContainer}>
                  <Ionicons name="today" size={24} color={colors.primary} />
                </View>
                <Text style={styles.todayLabel}>Today</Text>
              </View>

              {/* Node Connector */}
              <View style={styles.todayNodeConnector} />

              {/* Timeline Node */}
              <View style={styles.todayTimelineNode}>
                <View style={styles.todayTimelineNodeInner} />
              </View>
            </View>

            {/* BILL ITEMS */}
            {sortedBills.map((bill) => (
              <View key={bill.id} style={styles.billItemContainer}>
                {/* Bill Card */}
                <TouchableOpacity
                  style={styles.billCard}
                  onPress={() => onBillPress?.(bill)}
                  disabled={!onBillPress}
                  activeOpacity={0.7}
                >
                  {/* Company Header */}
                  <View style={styles.billHeader}>
                    {bill.companyLogo ? (
                      <Image
                        source={{ uri: bill.companyLogo }}
                        style={styles.companyLogo}
                      />
                    ) : (
                      <View style={styles.companyLogoPlaceholder}>
                        <Ionicons
                          name="receipt-outline"
                          size={16}
                          color={colors.neutralWhite}
                        />
                      </View>
                    )}
                    <Text style={styles.companyName} numberOfLines={1}>
                      {bill.companyName}
                    </Text>
                  </View>

                  {/* Amount */}
                  <Text style={styles.billAmount}>
                    ${bill.amount.toFixed(2)}
                  </Text>

                  {/* Due Date */}
                  <Text style={styles.billDueDate}>
                    {formatDueDate(bill.dueDate)}
                  </Text>
                </TouchableOpacity>

                {/* Node Connector - vertical line */}
                <View style={styles.nodeConnector} />

                {/* Timeline Node - dot on axis */}
                <View style={styles.timelineNode} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.sm,
    overflow: 'hidden',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[4],
    paddingBottom: responsive.spacing[2],
  },
  headerTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1],
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: responsive.spacing[2],
  },
  seeAllText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },

  // Timeline Container
  timelineContainer: {
    position: 'relative',
    paddingTop: responsive.spacing[4],
    paddingBottom: responsive.spacing[6],
  },
  timelineContent: {
    paddingLeft: responsive.spacing[8],
    paddingRight: responsive.spacing[12],
    alignItems: 'flex-start',
  },

  // Timeline Axis (horizontal line)
  timelineAxis: {
    position: 'absolute',
    top: ms(108),
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.timelineAxis,
  },

  // Timeline Items Container
  timelineItems: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: responsive.spacing[12],
  },

  // Today Marker
  todayMarker: {
    alignItems: 'center',
  },
  todayCard: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: responsive.spacing[3],
    alignItems: 'center',
    gap: responsive.spacing[2],
    minWidth: ms(80),
  },
  todayIconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: colors.neutralWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  todayNodeConnector: {
    width: 2,
    height: ms(16),
    marginTop: responsive.spacing[2],
    backgroundColor: colors.primary,
  },
  todayTimelineNode: {
    width: ms(16),
    height: ms(16),
    borderRadius: ms(8),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayTimelineNodeInner: {
    width: ms(8),
    height: ms(8),
    borderRadius: ms(4),
    backgroundColor: colors.neutralWhite,
  },

  // Bill Items
  billItemContainer: {
    alignItems: 'center',
  },
  billCard: {
    width: ms(160),
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: responsive.spacing[3],
    alignItems: 'center',
    backgroundColor: colors.neutralWhite,
    ...theme.shadows.sm,
  },
  billHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing[2],
    gap: responsive.spacing[2],
    width: '100%',
  },
  companyLogo: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(12),
  },
  companyLogoPlaceholder: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(12),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
    flex: 1,
  },
  billAmount: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: responsive.spacing[1],
  },
  billDueDate: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: colors.neutralDark,
  },

  // Timeline Node
  nodeConnector: {
    width: 2,
    height: ms(16),
    marginTop: responsive.spacing[2],
    backgroundColor: colors.timelineAxis,
  },
  timelineNode: {
    width: ms(12),
    height: ms(12),
    borderRadius: ms(6),
    backgroundColor: colors.timelineNode,
    borderWidth: 2,
    borderColor: colors.neutralWhite,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive.spacing[8],
    paddingHorizontal: responsive.spacing[4],
    gap: responsive.spacing[3],
  },
  emptyTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  emptySubtitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '400',
    color: colors.neutralDark,
    textAlign: 'center',
  },
});
